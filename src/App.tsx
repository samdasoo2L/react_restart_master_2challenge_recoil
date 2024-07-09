import { useForm } from "react-hook-form";
import { countryState } from "./atoms";
import { useRecoilState } from "recoil";
import WishLi from "./components/WishLi";
import ExLi from "./components/ExLi";
import LikeLi from "./components/LikeLi";
import { styled } from "styled-components";

const PicTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: white;
  margin: 15px 0px;
`;

const PicForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0px;
`;

const RequiredSpan = styled.span`
  color: #ff5252;
  font-weight: bolder;
  font-size: 20px;
`;

const PicInput = styled.input`
  height: 30px;
  background-color: #36afafb3;
  border: none;
  border-radius: 5px;
  color: white;
  padding-left: 5px;
  &:focus {
    border: 2px solid #003838b3;
  }
`;
const PicButton = styled.button`
  height: 30px;
  background-color: #0d2b2b29;
  border: none;
  border-radius: 5px;
  color: white;
  &:hover {
    border: 2px solid #003838b3;
  }
`;

interface IForm {
  wishCountry: string;
}

function App() {
  const [country, setCountry] = useRecoilState(countryState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ wishCountry }: IForm) => {
    const copyWishCountry = [...country.WishCountry];
    const newCountry = {
      id: Date.now(),
      country: wishCountry,
    };
    setCountry((country) => {
      return { ...country, WishCountry: [...copyWishCountry, newCountry] };
    });
    setValue("wishCountry", "");
  };
  return (
    <div>
      <PicTitle>내가 가고싶은 나라들</PicTitle>
      <PicForm onSubmit={handleSubmit(onValid)}>
        <PicInput
          {...register("wishCountry", { required: "🤔 required!" })}
          type="text"
          placeholder="이름"
        />
        <RequiredSpan>{errors.wishCountry?.message}</RequiredSpan>
        <PicButton>가자!</PicButton>
      </PicForm>
      <ul>
        {country.WishCountry.map((country) => (
          <WishLi
            key={country.id}
            keyId={country.id}
            countryName={country.country}
          />
        ))}
      </ul>
      <PicTitle>내가 가본 나라들</PicTitle>
      <ul>
        {country.ExCountry.map((country) => (
          <ExLi
            key={country.id}
            keyId={country.id}
            countryName={country.country}
          />
        ))}
      </ul>
      <PicTitle>내가 좋아하는 나라들</PicTitle>
      {country.LikeCountry.map((country) => (
        <LikeLi
          key={country.id}
          keyId={country.id}
          countryName={country.country}
        />
      ))}
    </div>
  );
}

export default App;
