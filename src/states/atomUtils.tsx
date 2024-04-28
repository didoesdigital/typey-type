import { Atom, useAtomValue } from "jotai";
import React, { ComponentType } from "react";

/**
 * Since a class component cannot consume atom directly, this allows providing it via props.
 */
export function withAtomCompat<P>(WrappedComponent: ComponentType<P>, propName: string, atom: Atom<any>): React.FC<any> {
  return (props) => {
    const atomValue = useAtomValue(atom);
    return <WrappedComponent {...{ ...props, [propName]: atomValue }} />;
  };
}
