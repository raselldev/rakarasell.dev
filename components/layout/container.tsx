import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container(props: ContainerProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      {props.children}
    </div>
  );
}
