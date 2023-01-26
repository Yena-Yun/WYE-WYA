import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import classnames from 'classnames';
import uuid4 from 'uuid4';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2';
import { CiCalendar } from 'react-icons/ci';
import {
  clickedTagPopupIndexState,
  expenseListState,
  isOpenCalendarState,
  isOpenTagPopupState,
  selectedDateState,
  transactionState,
} from 'recoil/atom';
import {
  closeModalSelector,
  toggleCalendarSelector,
  toggleTagPopupSelector,
  transactionListSelector,
} from 'recoil/selector';
import { Calendar } from 'components/Calendar/Calendar';
import { TagPopup } from './TagPopup/TagPopup';
import { Item, Transaction } from 'types/types';
import styles from './Modal.module.scss';

export const Modal = () => {
  const setCloseModal = useSetRecoilState(closeModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  const isOpenTagPopup = useRecoilValue(isOpenTagPopupState);
  const setOpenTagPopup = useSetRecoilState(toggleTagPopupSelector);
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  const selectedDate = useRecoilValue(selectedDateState);

  const [expenseItemList, setExpenseItemList] =
    useRecoilState<Item[]>(expenseListState);

  const resetExpenseItemList = useResetRecoilState(expenseListState);

  const [transaction, setTransaction] =
    useRecoilState<Transaction>(transactionState);

  const setTransactionList = useSetRecoilState(transactionListSelector);
  const resetTransaction = useResetRecoilState(transactionState);

  const [clickedTagPopupIndex, setClickedTagPopupIndex] = useRecoilState(
    clickedTagPopupIndexState
  );

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => {
          setCloseModal();
          setCloseTagPopup();
        }}
      ></div>

      <div className={styles.popupSection}>
        <div className={styles.popup}>
          {isOpenCalender && <Calendar />}
          <h2 className={styles.title}>항목 등록하기</h2>

          <div className={styles.mainContainer}>
            <div className={classnames(styles.inputGroup, styles.date)}>
              <h3 className={styles.subTitle}>날짜</h3>
              <div
                className={classnames(styles.dateIcon, styles.icon)}
                onClick={() => setToggleCalendar()}
              >
                <CiCalendar />
              </div>
              <div
                className={styles.selectedDate}
              >{`${selectedDate.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'long',
              })}`}</div>
            </div>

            <div className={styles.inputGroup}>
              <h3 className={styles.subTitle}>제목</h3>
              <div className={styles.inputItem}>
                <input
                  id='title'
                  placeholder='제목을 입력해주세요.'
                  onChange={(e) =>
                    setTransaction({
                      ...transaction,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <h3 className={styles.subTitle}>항목</h3>
              {expenseItemList.length > 0 &&
                expenseItemList.map(({ id: index, tag }) => (
                  <div
                    key={index}
                    className={classnames(
                      styles.inputItemGroup,
                      styles.addedInputItemGroup
                    )}
                  >
                    <div className={styles.mainInputGroup}>
                      <div className={styles.inputItem}>
                        <input
                          autoFocus
                          placeholder='항목명'
                          onChange={(e) => {
                            setExpenseItemList(
                              expenseItemList.map((item) =>
                                item.id === index
                                  ? { ...item, name: e.target.value }
                                  : item
                              )
                            );
                          }}
                        />
                      </div>
                      <div className={styles.priceTagGroup}>
                        <div className={styles.inputItem}>
                          <input
                            type='number'
                            placeholder='가격'
                            onChange={(e) => {
                              setExpenseItemList(
                                expenseItemList.map((item) =>
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
                          className={styles.tagInput}
                          data-id={index}
                          onClick={(e) => {
                            setClickedTagPopupIndex('');
                            setOpenTagPopup();
                            setClickedTagPopupIndex(
                              String(e.currentTarget.dataset.id)
                            );
                          }}
                        >
                          {tag !== '' ? (
                            <div className={styles.tag}>{tag}</div>
                          ) : (
                            <div className={styles.tag}>태그 등록</div>
                          )}
                        </div>
                      </div>
                      {clickedTagPopupIndex === index && isOpenTagPopup && (
                        <TagPopup />
                      )}
                    </div>
                    <div
                      className={classnames(
                        styles.removeItemButton,
                        styles.icon
                      )}
                      onClick={() => {
                        setExpenseItemList(
                          expenseItemList.filter(({ id }) => id !== index)
                        );
                      }}
                    >
                      <HiOutlineMinusCircle />
                    </div>
                  </div>
                ))}
              <div
                className={styles.addItemButton}
                onClick={() => {
                  setExpenseItemList([
                    ...expenseItemList,
                    { id: uuid4(), name: '', price: 0, tag: '' },
                  ]);
                }}
              >
                <div className={classnames(styles.addIcon, styles.icon)}>
                  <HiOutlinePlusCircle />
                </div>
                <div className={styles.addItemText}>항목 추가</div>
              </div>
            </div>
          </div>

          <div className={styles.submitButtonContainer}>
            <button
              className={styles.submitButton}
              onClick={() => {
                setCloseModal();

                setTransaction({
                  ...transaction,
                  id: uuid4(),
                  items: expenseItemList,
                });

                setTransactionList();

                resetExpenseItemList();
                resetTransaction();
              }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
