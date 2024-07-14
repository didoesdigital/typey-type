import { atom, useAtom } from "jotai";
import type { Atom, WritableAtom } from "jotai";
import React, { ComponentType } from "react";

export const subFieldAtomGenerator = <S,>(state: WritableAtom<S, [S], void>) => <T extends keyof S>(field: T) => atom(
  (get) => get(state)[field],
  (get, set, update: any) => {
    set(state, { ...get(state), [field]: update });
  });

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
