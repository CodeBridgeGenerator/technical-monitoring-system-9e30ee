
import { faker } from "@faker-js/faker";
export default (user,count,checkListIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
checkListId: checkListIdIds[i % checkListIdIds.length],
name: faker.lorem.sentence(1),
isBoolean: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
order: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
