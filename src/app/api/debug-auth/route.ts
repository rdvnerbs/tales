import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";

export async function GET(request: Request) {
  try {
    // Auth kullanıcılarını getir
    const { data: authUsers, error: authError } =
      await supabase.auth.admin.listUsers();

    if (authError) {
      return NextResponse.json(
        { error: "Auth kullanıcıları getirilemedi", details: authError },
        { status: 500 },
      );
    }

    // Public users tablosundaki kullanıcıları getir
    const { data: publicUsers, error: publicError } = await supabase
      .from("users")
      .select("*");

    if (publicError) {
      return NextResponse.json(
        { error: "Public kullanıcıları getirilemedi", details: publicError },
        { status: 500 },
      );
    }

    return NextResponse.json({
      authUsers: authUsers.users,
      publicUsers,
    });
  } catch (error) {
    console.error("Debug API hatası:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 },
    );
  }
}
