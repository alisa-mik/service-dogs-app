import { DogBasic } from "../../../types/dogTypes";
import { Label } from "../../commonParts/Labels";
import { Row } from "../../commonParts/Layouts";
import { IInput } from "../InputInjector";
import { Checkbox } from "../styledInputs";

interface IAttendance extends IInput {
  dogs: DogBasic[];
}

export const AttendanceInput: React.FC<IAttendance> = ({
  path,
  formik,
  dogs,
}) => {
  const modifiedDogs = dogs.map((dog) => {
    return {
      dogName: dog.dogName,
      dogId: dog.dogId,
      attendance: formik.values[path].includes(dog.dogId),
    };
  });

  const handleChange = (dogId: string) => {
    let attendanceArray = [...formik.values[path]];
    if (!attendanceArray.includes(dogId)) {
      attendanceArray.push(dogId);
    } else {
      attendanceArray = attendanceArray.filter((at) => at !== dogId);
    }
    formik.setFieldValue(path, attendanceArray);
  };

  return (
    <Row>
      {modifiedDogs.map((dog) => {
        return (
          <div>
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
    </Row>
  );
};
