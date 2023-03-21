import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AOpen, AIndex } from 'recoil/atom';
import { SMain } from '~/recoil/selector';
import { Banner, Header } from 'components/Main';
import { ManageTag, TabMenu } from 'components/TabMenu';
import { AddModal, AllDetail, ByDateDetail, Toast } from 'components/Modal';
import styles from './Home.module.scss';
import { TagPopup } from '~/components/Modal/Add/TagPopup/TagPopup';
import { useEffect } from 'react';

export const Home = () => {
  const isOpenAddModal = useRecoilValue(AOpen.isOpenAddModalState);
  const isOpenDetailModal = useRecoilValue(AOpen.isOpenAllDetailModalState);
  const isOpenByDateDetailModal = useRecoilValue(
    AOpen.isOpenByDateDetailModalState
  );
  const isOpenTagModal = useRecoilValue(AOpen.isOpenTagModalState);
  const clickedIndex = useRecoilValue(AIndex.clickedTransactionIndexState);
  const clickedItemIndex = useRecoilValue(AIndex.clickedListIndexState);
  const isOpenTagPopup = useRecoilValue(AOpen.isOpenTagPopupState);
  const isOpenDeleteTagToast = useRecoilValue(AOpen.isOpenDeleteTagToastState);
  const getDefaultTransaction = useSetRecoilState(
    SMain.getDefaultTransactionSelector
  );
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);

  useEffect(() => {
    getDefaultTransaction();
    setTotalExpense('all');
    setTotalExpense('byDate');
    // setDefaultTag();
  }, []);

  return (
    <>
      {isOpenAddModal && <AddModal />}
      {clickedIndex && isOpenDetailModal && <AllDetail />}
      {clickedItemIndex && isOpenByDateDetailModal && <ByDateDetail />}
      {isOpenTagModal && <ManageTag />}
      {isOpenTagPopup && <TagPopup />}
      {isOpenDeleteTagToast && <Toast role='deleteTag' />}

      <div className={styles.container}>
        <Header />
        <div className={styles.innerContainer}>
          <Banner />
          <TabMenu />
        </div>
      </div>
    </>
  );
};
