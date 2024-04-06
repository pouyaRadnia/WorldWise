import styles from "./Button.module.css";
type Button = {
  children: JSX.Element | string;
  onClick: (e: any) => void;
  type: "primary" | "back";
};
export default function Button({ children, onClick, type }: Button) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
