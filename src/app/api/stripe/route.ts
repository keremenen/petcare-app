import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  const data = await request.json()

  //veryfiy the hook is from stripe

  //fulfill the order
  await prisma.user.update({
    where: {
      email: data.data.object.customer_email,
    },
    data: {
      hasAccess: true,
    },
  })

  return Response.json(null, { status: 200 })
}
