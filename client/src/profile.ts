import { atom } from 'jotai';

const usernameAtom = atom<string | null>(null);

export default { usernameAtom }
