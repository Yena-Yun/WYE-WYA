import { useRecoilState } from 'recoil';
import { listState } from 'recoil/atom';
import styles from './Title.module.scss';

export const Title = () => {
  const [list, setList] = useRecoilState(listState);

  return (
    <div className={styles.inputGroup}>
      <label htmlFor='title' className={styles.subTitle}>
        제목
      </label>
      <div className={styles.inputItem}>
        <input
          id='title'
          placeholder='제목을 입력해주세요.'
          autoFocus
          onChange={(e) =>
            setList({
              ...list,
              title: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};
