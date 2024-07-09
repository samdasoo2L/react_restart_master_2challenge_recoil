import { useRecoilState } from "recoil";
import { countryState } from "../atoms";
import styled from "styled-components";

const CountryLi = styled.li`
  display: flex;
  font-size: 25px;
  color: white;
  font-weight: 500;
  gap: 5px;
`;

const CountryStateButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: #0d2b2b29;
  border-radius: 5px;
  margin-left: 3px;
  font-size: 20px;
`;

interface IWishLiProps {
  keyId: number;
  countryName: string;
}

function WishLi({ keyId, countryName }: IWishLiProps) {
  const [country, setCountry] = useRecoilState(countryState);
  const exButton = () => {
    const delIndex = country.WishCountry.findIndex((item) => item.id === keyId);
    if (delIndex !== -1) {
      const newWishCountry = [...country.WishCountry];
      newWishCountry.splice(delIndex, 1);
      setCountry((country) => {
        return {
          ...country,
          WishCountry: [...newWishCountry],
          ExCountry: [
            ...country.ExCountry,
            { id: keyId, country: countryName },
          ],
        };
      });
      console.log(country.ExCountry);
    }
  };
  const delButton = () => {
    const delIndex = country.WishCountry.findIndex((item) => item.id === keyId);
    if (delIndex !== -1) {
      const newWishCountry = [...country.WishCountry];
      newWishCountry.splice(delIndex, 1);
      setCountry((country) => {
        return { ...country, WishCountry: [...newWishCountry] };
      });
    }
  };
  return (
    <CountryLi>
      {countryName}
      <CountryStateButton onClick={exButton}>✅</CountryStateButton>
      <CountryStateButton onClick={delButton}>🗑️</CountryStateButton>
    </CountryLi>
  );
}

export default WishLi;
