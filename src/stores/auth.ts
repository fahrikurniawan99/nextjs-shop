import { atomWithStorage } from "jotai/utils";

interface AuthState {
  id: string | null;
  token: string | null;
}

export const authAtom = atomWithStorage<AuthState>("auth", {
  id: null,
  token: null,
});
