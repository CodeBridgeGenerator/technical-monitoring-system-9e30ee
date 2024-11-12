
import { faker } from "@faker-js/faker";
export default (user,count,checkListFormIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
machineId: faker.lorem.sentence(""),
checkListFormId: checkListFormIdIds[i % checkListFormIdIds.length],
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
