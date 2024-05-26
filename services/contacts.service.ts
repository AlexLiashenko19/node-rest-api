import fs from "fs/promises";
import { Contact } from "../models/contact";
import { UpdateQuery, Types } from "mongoose";

export async function listContacts(owner: any, page: number, limit: number) {
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, null, {
    skip,
    limit: 2,
  }).populate("owner");
  return result;
}

export async function getContactsById(id: any) {
  const result = Contact.findById(id);
  return result;
}

export async function deleteById(id: any) {
  const result = await Contact.findByIdAndDelete(id);
  return result;
}

export async function addContactNew(data: any, owner: any) {
  const contact = await Contact.create({ ...data, owner });
  return contact;
}

export async function updateById(
  id: any,
  data: UpdateQuery<
    { createdAt: NativeDate; updatedAt: NativeDate } & {
      name: string;
      favorite: boolean;
      owner: Types.ObjectId;
      email?: string | null | undefined;
      phone?: string | null | undefined;
    }
  >
) {
  const result = await Contact.findByIdAndUpdate(id, data, {
    lean: true,
    new: true,
  });
  return result;
}
