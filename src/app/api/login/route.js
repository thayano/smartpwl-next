import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try {
        const user = await axios.get('', {
            headers: {
                Authorization: 'token '
            }
        });
        return NextResponse.json(user.data);
    } 
    catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}