import { getTool } from "@/lib/content";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool?.affiliateUrl) {
    redirect("/tools");
  }

  redirect(tool.affiliateUrl);
}
