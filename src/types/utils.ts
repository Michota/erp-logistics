/**
 * Works the same way as `Omit` does, but it supports *InteliSense*.
 *
 *
 * @template Type - The object type to omit properties from.
 * @template Key - The key of the properties to omit.
 * @param {Type} - The object to omit properties from.
 * @returns {Skip<Type, Key>} - The resulting object type after omitting properties.
 */
export type Skip<Type extends object, Key extends keyof Type> = Omit<Type, keyof Pick<Type, Key>>;
