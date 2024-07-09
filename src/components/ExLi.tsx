import { useRecoilState } from "recoil";
import { countryState } from "../atoms";
import { styled } from "styled-components";

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

interface IExLiProps {
  keyId: number;
  countryName: string;
}

function ExLi({ keyId, countryName }: IExLiProps) {
  const [country, setCountry] = useRecoilState(countryState);
  const likeButton = () => {
    const delIndex = country.ExCountry.findIndex((item) => item.id === keyId);
    if (delIndex !== -1) {
      const newExCountry = [...country.ExCountry];
      newExCountry.splice(delIndex, 1);
      setCountry((country) => {
        return {
          ...country,
          ExCountry: [...newExCountry],
          LikeCountry: [
            ...country.LikeCountry,
            { id: keyId, country: countryName },
          ],
        };
      });
    }
  };
  const wishButton = () => {
    const delIndex = country.ExCountry.findIndex((item) => item.id === keyId);
    if (delIndex !== -1) {
      const newExCountry = [...country.ExCountry];
      newExCountry.splice(delIndex, 1);
      setCountry((country) => {
        return {
          ...country,
          ExCountry: [...newExCountry],
          WishCountry: [
            ...country.WishCountry,
            { id: keyId, country: countryName },
          ],
        };
      });
    }
  };
  return (
    <CountryLi>
      {countryName}
      <CountryStateButton onClick={likeButton}>👍</CountryStateButton>
      <CountryStateButton onClick={wishButton}>❌</CountryStateButton>
    </CountryLi>
  );
}

export default ExLi;
