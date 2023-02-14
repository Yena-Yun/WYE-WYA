import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import classnames from 'classnames';
import {
  clickedTagPopupIndexState,
  listItemState,
  isOpenTagPopupState,
} from 'recoil/atom';
import { toggleTagPopupSelector } from 'recoil/selector';
import { TagPopup } from 'components/Modal/TagPopup/TagPopup';
import { ItemType } from 'types/types';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2';
import styles from './List.module.scss';

export const List = () => {
  const isOpenTagPopup = useRecoilValue(isOpenTagPopupState);
  const setOpenTagPopup = useSetRecoilState(toggleTagPopupSelector);
  const [clickedTagPopupIndex, setClickedTagPopupIndex] = useRecoilState(
    clickedTagPopupIndexState
  );
  const [listItem, setListItem] = useRecoilState<ItemType[]>(listItemState);
  const resetItemList = useResetRecoilState(listItemState);

  const handleAddItem = () => {
    resetItemList();
  };

  return (
    <div className={styles.inputGroupWrap}>
      <h3 className={styles.subTitle}>항목</h3>

      {listItem.map(({ id: index, tag }) => (
        <div key={index} className={styles.inputItemGroup}>
          <div className={styles.inputGroup}>
            <div className={classnames(styles.inputItem, styles.nameInput)}>
              <input
                placeholder='항목명'
                onChange={(e) => {
                  setListItem(
                    listItem.map((item) =>
                      item.id === index
                        ? { ...item, name: e.target.value }
                        : item
                    )
                  );
                }}
              />
            </div>

            <div className={styles.priceTagGroup}>
              <div className={classnames(styles.inputItem, styles.priceInput)}>
                <input
                  type='number'
                  placeholder='가격'
                  onChange={(e) => {
                    if (typeof e.target.value !== 'number') return;

                    setListItem(
                      listItem.map((item) =>
                        item.id === index
                          ? {
                              ...item,
                              price: parseInt(e.target.value),
                            }
                          : item
                      )
                    );
                  }}
                />
              </div>

              <div
                className={styles.tagOpenButton}
                data-id={index}
                onClick={(e) => {
                  setOpenTagPopup();
                  setClickedTagPopupIndex(String(e.currentTarget.dataset.id));
                }}
              >
                {tag ? (
                  <div className={styles.tag}>{tag}</div>
                ) : (
                  <div className={styles.tag}>태그 등록하기</div>
                )}
              </div>
            </div>
            {clickedTagPopupIndex === index && isOpenTagPopup && <TagPopup />}
          </div>

          <div
            className={styles.removeItemButton}
            onClick={() => {
              setListItem(listItem.filter(({ id }) => id !== index));
            }}
          >
            <HiOutlineMinusCircle />
          </div>
        </div>
      ))}

      <div className={styles.addItemButton} onClick={handleAddItem}>
        <div className={styles.addIcon}>
          <HiOutlinePlusCircle />
        </div>
        <div className={styles.addItemText}>항목 추가</div>
      </div>
    </div>
  );
};
