import { Atom, useAtom } from "jotai";
import React, { ComponentType } from "react";

/**
 * Since a class component cannot consume atom directly, this allows providing it via props.
 */
export function withAtomCompat<P>(WrappedComponent: ComponentType<P>, propName: string, atom: Atom<any>): React.FC<any> {
  return (props) => {
    const [atomValue, setAtomValue] = useAtom(atom);
    return <WrappedComponent {...{ ...props, [propName]: atomValue, [getSetterName(propName)]: setAtomValue }} />;
  };
}

function getSetterName (propName: string) {
  return `set${propName.charAt(0).toUpperCase() + propName.slice(1)}`;
}

export function withAtomsCompat<P>(WrappedComponent: ComponentType<P>, atoms: [string, Atom<any>][]): React.ComponentType<any> {
  if (atoms.length === 0) return WrappedComponent;
  const [propName, atom] = atoms.pop()!;
  return withAtomsCompat(withAtomCompat(WrappedComponent, propName, atom), atoms);
}
