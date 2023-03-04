import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ADate } from 'recoil/atom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  const [currentMonth, setCurrentMonth] = useRecoilState(
    ADate.byWeekStartDateState
  );
  const [isClickedButtonIndex, setIsClickedButtonIndex] = useState(0);

  /* 주차별 total 보여주기 (전역으로 관리) */
  const [weeksOfMonth, setWeeksOfMonth] = useRecoilState(
    ADate.weeksOfMonthState
  );

  const getWeeks = () => {
    const weekNumber = DateFn.getWeeksInMonth(currentMonth);
    const weeksArray = [...Array(weekNumber).keys()];
    return weeksArray.map((weekNum) => weekNum + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.arrow}
          onClick={() =>
            Hook.changeMonth('PREV', { currentMonth, setCurrentMonth })
          }
        >
          <BsChevronLeft />
        </div>
        <div className={styles.title}>
          {DateFn.format(currentMonth, 'yyyy')}년{' '}
          {DateFn.format(currentMonth, 'M')}월
        </div>
        <div
          className={styles.arrow}
          onClick={() =>
            Hook.changeMonth('NEXT', { currentMonth, setCurrentMonth })
          }
        >
          <BsChevronRight />
        </div>
      </div>

      <div className={styles.weeksButtonWrap}>
        {getWeeks().map((week, id) => (
          <li
            key={id}
            id={String(id)}
            className={classNames(
              styles.weekButton,
              isClickedButtonIndex === id && styles.clicked
            )}
            onClick={(e) => {
              setIsClickedButtonIndex(Number(e.currentTarget.id));
            }}
          >
            {week}주차
          </li>
        ))}
      </div>
    </div>
  );
};
