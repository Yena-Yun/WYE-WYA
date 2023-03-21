import { Suspense, useTransition } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import PulseLoader from 'react-spinners/PulseLoader';
import { AOpen, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { All, ByDate, ByWeek } from 'components/TabMenu';
import { Const } from 'utils';
import { TabMenuIdType } from 'types/tabMenuType';
import styles from './TabMenuLayout.module.scss';

export const TabMenu = () => {
  const [isPending, startTransition] = useTransition();
  const setCloseByDateCalendar = useSetRecoilState(
    AOpen.isOpenByDateCalendarState
  );
  const setOpenTagModal = useSetRecoilState(SOpen.toggleModalSelector);
  const [clickedTabName, setClickedTabName] = useRecoilState(
    AIndex.clickedTabNameState
  );

  const tabClickHandler = (id: TabMenuIdType) => {
    startTransition(() => {
      setClickedTabName(id);
    });

    setCloseByDateCalendar(false);
  };

  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        {Const.TAB_MENU.map(({ id, name }) => (
          <li
            key={id}
            className={classnames(
              styles.filterTabItem,
              clickedTabName === id && styles.selected,
              isPending && styles.blur
            )}
            onClick={() => tabClickHandler(id)}
          >
            {name}
          </li>
        ))}
        <button
          className={styles.manageTagButton}
          onClick={() => setOpenTagModal('tagModal')}
        >
          태그 관리
        </button>
      </ul>

      <Suspense
        /* API 로딩이 있다고 가정 */
        fallback={
          <PulseLoader
            color='#83c7d5'
            // loading={isLoading}
            aria-label='loading-spinner'
          />
        }
      >
        {clickedTabName === 'byAll' ? (
          <All />
        ) : clickedTabName === 'byWeek' ? (
          <ByWeek />
        ) : clickedTabName === 'byDate' ? (
          <ByDate />
        ) : null}
      </Suspense>
    </section>
  );
};
