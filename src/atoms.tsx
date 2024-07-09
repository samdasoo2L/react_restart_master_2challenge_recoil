import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface ICountry {
  id: number;
  country: string;
}

interface ICountryState {
  WishCountry: ICountry[];
  ExCountry: ICountry[];
  LikeCountry: ICountry[];
}

const { persistAtom } = recoilPersist({
  key: "localStorage", // 고유한 key 값
  storage: localStorage,
});

export const countryState = atom<ICountryState>({
  key: "countryState",
  default: {
    WishCountry: [],
    ExCountry: [],
    LikeCountry: [],
  },
  effects_UNSTABLE: [persistAtom],
});
