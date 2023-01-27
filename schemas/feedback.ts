import { defineField, defineType } from "sanity";

export default defineType({
  name: "feedback",
  title: "Feedback",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "poruka",
      title: "Poruka",
      type: "text",
    }),
  ],
});
