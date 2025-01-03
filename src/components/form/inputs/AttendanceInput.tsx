import { DogBasic } from "../../../types/dogTypes";
import { Label } from "../../commonParts/Labels";
import { RowWrap } from "../../commonParts/Layouts";
import { IInput } from "../InputInjector";
import { Checkbox } from "../styledInputs";

interface IAttendance extends IInput {
  dogs: DogBasic[];
}

export const AttendanceInput: React.FC<IAttendance> = ({
  path,
  formik,
  value,
  dogs,
}) => {
  const modifiedDogs = dogs.map((dog) => {
    return {
      dogName: dog.dogName,
      dogId: dog.dogId,
      attendance: value.includes(dog.dogId),
    };
  });

  const handleChange = (dogId: string) => {
    let attendanceArray = [...value];
    if (!attendanceArray.includes(dogId)) {
      attendanceArray.push(dogId);
    } else {
      attendanceArray = attendanceArray.filter((at) => at !== dogId);
    }
    formik.setFieldValue(path, attendanceArray);
  };

  return (
    <RowWrap>
      {modifiedDogs.map((dog) => {
        return (
          <div key={dog.dogId}>
            <Checkbox
              type="checkbox"
              name={dog.dogId}
              checked={dog.attendance}
              onChange={() => handleChange(dog.dogId)}
            />
            <Label>{dog.dogName}</Label>
          </div>
        );
      })}
    </RowWrap>
  );
};
