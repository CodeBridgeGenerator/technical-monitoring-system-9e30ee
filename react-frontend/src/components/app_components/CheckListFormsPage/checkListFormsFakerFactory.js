
import { faker } from "@faker-js/faker";
export default (user,count,checklistIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
checklistId: checklistIdIds[i % checklistIdIds.length],
description: faker.datatype.boolean(""),
results: faker.datatype.boolean(""),
isValid: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
