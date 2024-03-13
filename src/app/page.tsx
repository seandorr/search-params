"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./page.module.scss";

interface IFormState {
  chemical: string;
  company: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm({
    initialValues: {
      chemical: searchParams.get("chemical")?.toString() || "",
      company: searchParams.get("company")?.toString() || "",
    },
  });

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // form.onSubmit((values) => console.log(values));
    const params = new URLSearchParams(searchParams);

    Object.keys(form.values).map((input: string) => {
      if (form.values[input as keyof IFormState]) {
        params.set(input, form.values[input as keyof IFormState]);
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
            <TextInput
              label="Chemical"
              placeholder="Chemical"
              {...form.getInputProps("chemical")}
            />
            <TextInput
              label="Company"
              placeholder="Company"
              {...form.getInputProps("company")}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.gap}>Content</div>
      </main>
    </main>
  );
}
