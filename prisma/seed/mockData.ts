import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('ce2d724d-f4fa-4268-88e7-e30da932a395', '1Hoyt50@gmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=3', 'invabc123', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('03dde842-399d-4e46-8d37-3df032f995e0', '9Jessyca_Schaefer@hotmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=11', 'invjkl012', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('dadc1530-f235-46c8-930d-8a91610d8097', '17Eva_Schowalter92@gmail.com', 'William Taylor', 'https://i.imgur.com/YfJQV5z.png?id=19', 'invdef456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('b17b91ad-e9ba-452d-8b31-7c6a534d76e9', '25Jamison_Smith@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=27', 'invabc123', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2734f14b-9323-41c3-8187-a907d0566033', '33Marlee_Wolff-Crist43@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', 'invjkl012', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('6e0ad444-c7c0-4a27-ab39-7fa4a487efb1', '41Audie.Will@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=43', 'invabc123', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('f0ae2ba5-785a-43d1-a19a-20fdb1b8bcff', '57Santa_Tillman-Conn65@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'invmno345', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c3961aea-3ee5-4fa2-9f31-e73e0fcc8419', '65Favian.Olson4@hotmail.com', 'William Taylor', 'https://i.imgur.com/YfJQV5z.png?id=67', 'invmno345', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('0c6fbdc1-625c-42f6-836a-d8289b8ed135', '73Henderson.Kihn@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=75', 'invghi789', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('f8641768-2087-42aa-96f4-d93ceab0aa3b', 'Green Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('4d0b995e-9a14-4a60-865e-1fe0c24b2d34', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ed4020e7-2ebe-443c-9e12-8b99eed94058', 'Future Ventures Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('e2f5dfc2-796c-4d1f-9893-776c013fb02d', 'Digital Pioneers Co.', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('f99ec663-d2c7-4e29-ac9d-bf6295dc28ba', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('82a74d5a-ebb6-4bc5-adbe-aee26ea4c16e', 'Future Ventures Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('eb7b24ba-538e-460a-afd6-4eddde8ac9ee', 'Green Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('036e0b83-6e10-42a9-8245-db412a2ebde2', 'Future Ventures Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('89e6ccb3-408e-4f70-989c-f078a9027ae8', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('fb3d15e4-4024-4e2a-bec4-f9d66aac379c', 'Future Ventures Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('0186e267-acb8-43c3-8db7-b3ab9a6914b1', 'Operations Director', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '4d0b995e-9a14-4a60-865e-1fe0c24b2d34');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('4ce1e43b-1f35-4ee7-b5a8-aafde9a6fd8b', 'Finance Manager', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('175195e4-e629-4e4b-a09d-6b5bf6df0788', 'Finance Manager', 'f0ae2ba5-785a-43d1-a19a-20fdb1b8bcff', 'fb3d15e4-4024-4e2a-bec4-f9d66aac379c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('e7946fe5-8b1f-416d-b5ad-940f3372d5c4', 'IT Coordinator', 'dadc1530-f235-46c8-930d-8a91610d8097', '4d0b995e-9a14-4a60-865e-1fe0c24b2d34');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('fc3b0bbe-63f7-427d-8d58-2d11c67b50e7', 'Operations Director', 'ce2d724d-f4fa-4268-88e7-e30da932a395', 'f99ec663-d2c7-4e29-ac9d-bf6295dc28ba');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('462c4c75-0d43-4590-bbf1-bd109bfac760', 'IT Coordinator', 'b17b91ad-e9ba-452d-8b31-7c6a534d76e9', 'ed4020e7-2ebe-443c-9e12-8b99eed94058');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('dedf680f-72ef-4508-b33f-f9e04a24f050', 'IT Coordinator', 'b17b91ad-e9ba-452d-8b31-7c6a534d76e9', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('8366929a-860e-4086-95b6-c91d094232f2', 'Marketing Strategist', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'e2f5dfc2-796c-4d1f-9893-776c013fb02d');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('bc90890f-e582-4a34-9126-d3da5d6db8dd', 'IT Coordinator', '6e0ad444-c7c0-4a27-ab39-7fa4a487efb1', 'f99ec663-d2c7-4e29-ac9d-bf6295dc28ba');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('e1c103bc-cbf5-4b55-8ebd-b050bcf0ea97', 'IT Coordinator', 'c3961aea-3ee5-4fa2-9f31-e73e0fcc8419', '82a74d5a-ebb6-4bc5-adbe-aee26ea4c16e');

INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('6620e967-ec0c-4d0e-acc1-2bc7a24befb4', 'Graphic Design Services', '300.00', 'rejected', 'https://i.imgur.com/YfJQV5z.png?id=134', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ed4020e7-2ebe-443c-9e12-8b99eed94058');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('aad6062f-db0f-4ca3-ada4-61c23e6d97bb', 'Monthly Subscription', '49.99', 'approved', 'https://i.imgur.com/YfJQV5z.png?id=139', '0c6fbdc1-625c-42f6-836a-d8289b8ed135', 'f99ec663-d2c7-4e29-ac9d-bf6295dc28ba');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('46c4ccce-2379-4746-bdc3-c32c5d16f973', 'Website Development', '1200.00', 'approved', 'https://i.imgur.com/YfJQV5z.png?id=144', '03dde842-399d-4e46-8d37-3df032f995e0', 'f8641768-2087-42aa-96f4-d93ceab0aa3b');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('354491de-2654-4d05-975f-ff53ad002c3d', 'Consultation Fee', '1500.00', 'approved', 'https://i.imgur.com/YfJQV5z.png?id=149', '6e0ad444-c7c0-4a27-ab39-7fa4a487efb1', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('91331620-eda1-4d13-aef7-72671801f42a', 'Website Development', '1200.00', 'approved', 'https://i.imgur.com/YfJQV5z.png?id=154', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'f8641768-2087-42aa-96f4-d93ceab0aa3b');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('363cccf7-5b56-41fb-8452-1c0eade1e7f0', 'Graphic Design Services', '1200.00', 'pending', 'https://i.imgur.com/YfJQV5z.png?id=159', '03dde842-399d-4e46-8d37-3df032f995e0', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('67ff3c6b-c077-48c7-b267-4430d9da9863', 'Graphic Design Services', '250.00', 'pending', 'https://i.imgur.com/YfJQV5z.png?id=164', 'ce2d724d-f4fa-4268-88e7-e30da932a395', '4d0b995e-9a14-4a60-865e-1fe0c24b2d34');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('77246eb0-a9d2-4281-bd07-9ca860855d13', 'Graphic Design Services', '49.99', 'pending', 'https://i.imgur.com/YfJQV5z.png?id=169', '0c6fbdc1-625c-42f6-836a-d8289b8ed135', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('e23b44b1-8b99-4f7f-9677-6f8bebc765da', 'Graphic Design Services', '300.00', 'rejected', 'https://i.imgur.com/YfJQV5z.png?id=174', '2734f14b-9323-41c3-8187-a907d0566033', 'f8641768-2087-42aa-96f4-d93ceab0aa3b');
INSERT INTO "Payment" ("id", "title", "amount", "status", "invoiceUrl", "userId", "organizationId") VALUES ('291ed862-cea9-4d68-a8e1-9255d2f234d9', 'Software License', '1500.00', 'rejected', 'https://i.imgur.com/YfJQV5z.png?id=179', 'b17b91ad-e9ba-452d-8b31-7c6a534d76e9', 'ed4020e7-2ebe-443c-9e12-8b99eed94058');

INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('3422d56f-30b8-4fa2-ade9-30b697c1d135', 'bank_statement', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=182', 'pending', '2734f14b-9323-41c3-8187-a907d0566033', 'ed4020e7-2ebe-443c-9e12-8b99eed94058');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('6eebf77e-f514-40bb-bc74-e571fa90be25', 'bank_statement', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=186', 'pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('2e839733-e7e5-453d-95da-acfd967c5f6f', 'bank_statement', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=190', 'approved', '0c6fbdc1-625c-42f6-836a-d8289b8ed135', '036e0b83-6e10-42a9-8245-db412a2ebde2');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('2ac0c9b6-b475-4d34-a63d-0178fdea2152', 'bank_statement', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=194', 'approved', '6e0ad444-c7c0-4a27-ab39-7fa4a487efb1', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('d7bf2495-c3b8-4f91-9572-1970d5a3ac66', 'national_id', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=198', 'approved', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'eb7b24ba-538e-460a-afd6-4eddde8ac9ee');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('359115c2-d206-4471-97f8-5fc31022ad4d', 'driver_license', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=202', 'rejected', 'ce2d724d-f4fa-4268-88e7-e30da932a395', 'e2f5dfc2-796c-4d1f-9893-776c013fb02d');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('c2308502-acb0-4393-ba67-01e09e7ba242', 'utility_bill', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=206', 'pending', 'b17b91ad-e9ba-452d-8b31-7c6a534d76e9', 'e2f5dfc2-796c-4d1f-9893-776c013fb02d');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('1737e58e-3b1b-4fb0-be64-c3440bfa340d', 'utility_bill', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=210', 'pending', 'dadc1530-f235-46c8-930d-8a91610d8097', 'f8641768-2087-42aa-96f4-d93ceab0aa3b');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('1bdf2f90-6163-474e-acdc-f9a7b7f04bdd', 'driver_license', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=214', 'approved', '03dde842-399d-4e46-8d37-3df032f995e0', '89e6ccb3-408e-4f70-989c-f078a9027ae8');
INSERT INTO "Document" ("id", "type", "fileUrl", "status", "userId", "organizationId") VALUES ('0da82d29-525e-4dff-b76b-f61a1619b18d', 'national_id', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=218', 'approved', 'c3961aea-3ee5-4fa2-9f31-e73e0fcc8419', 'eb7b24ba-538e-460a-afd6-4eddde8ac9ee');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
