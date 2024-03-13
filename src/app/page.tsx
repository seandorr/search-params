"use client";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./page.module.scss";

const SearchableInput = ({
  label,
  list,
  options,
  onChange,
  defaultValue,
}: {
  label: string;
  type?: string;
  list?: string;
  options: { id: number; value: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultValue: string | undefined;
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}:</label>
      <input
        type="search"
        list={list}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <datalist id={list}>
        {options.map((option, key) => {
          return <option key={key}>{option.value}</option>;
        })}
      </datalist>
    </div>
  );
};
interface IFormState {
  chemical: string;
  company: string;
}
export default function Home() {
  const [formState, setFormState] = useState<IFormState>({
    chemical: "",
    company: "",
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFormState = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setFormState({ ...formState, [key]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    Object.keys(formState).map((input: string) => {
      if (formState[input as keyof IFormState]) {
        params.set(input, formState[input as keyof IFormState]);
      } else {
        params.delete(input);
      }
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <div className={styles.gap}>
          <form onSubmit={handleFormSubmit}>
            <SearchableInput
              label="Chemical"
              list="chemList"
              options={[
                { id: 1, value: "water" },
                { id: 2, value: "melamin" },
                { id: 3, value: "steam" },
              ]}
              onChange={(e) => handleFormState(e, "chemical")}
              defaultValue={searchParams.get("chemical")?.toString()}
            />

            {/* <Input
              label="Company"
              onChange={(e) => handleFormState(e, "company")}
              defaultValue={searchParams.get("company")?.toString()}
            /> */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.gap}>Content</div>
      </main>
    </main>
  );
}
