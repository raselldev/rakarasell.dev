import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  classNames?: string;
};

export default function Container({ children, classNames }: ContainerProps) {
  const containerClass = `mx-auto max-w-screen-xl px-4 ${classNames}`;
  return <div className={containerClass}>{children}</div>;
}
