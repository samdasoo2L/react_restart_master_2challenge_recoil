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

interface ILikeLiProps {
  keyId: number;
  countryName: string;
}

function LikeLi({ keyId, countryName }: ILikeLiProps) {
  const [country, setCountry] = useRecoilState(countryState);
  const ExButton = () => {
    const delIndex = country.LikeCountry.findIndex((item) => item.id === keyId);
    if (delIndex !== -1) {
      const newLikeCountry = [...country.LikeCountry];
      newLikeCountry.splice(delIndex, 1);
      setCountry((country) => {
        return {
          ...country,
          LikeCountry: [...newLikeCountry],
          ExCountry: [
            ...country.ExCountry,
            { id: keyId, country: countryName },
          ],
        };
      });
    }
  };
  return (
    <CountryLi>
      {countryName}
      <CountryStateButton onClick={ExButton}>👍</CountryStateButton>
    </CountryLi>
  );
}

export default LikeLi;
