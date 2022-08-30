import {UserType} from "../../redux/reducerUsers";

export const updateObjectInArray = (items: UserType[], itemId: number, objPropName: keyof UserType, newObjProps: { followed: boolean }): UserType[] => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}