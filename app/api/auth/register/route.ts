import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json();
  const { username, email, password } = body;

  // Validate data
  
  // Hash the password
  const hash = bcrypt.hashSync(password, 8);

  // Create a user in db
  await prisma.tabela_usuarios.create({
    data: {
      usuario_nome: username,
      usuario_email: email,
      usuario_senha: hash,
    },
  });

  // return something
  return Response.json({});
}