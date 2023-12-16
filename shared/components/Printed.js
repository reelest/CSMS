import Template from "./Template";
import styles from "@/shared/utils/print_element.module.css";

export default function Printed(props) {
  return <Template className={styles["print-preserve"]} props={props} />;
}
