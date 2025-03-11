import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    // Kullanıcının admin olup olmadığını kontrol et
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user role:", userError);
      return NextResponse.json(
        { error: "Failed to fetch user role" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: userData });
  } catch (error) {
    console.error("Error in check-admin-role API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
