import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try {
        const user = await axios.get('http://146.190.197.43:7000/users/by_token/', {
            headers: {
                Authorization: 'token 6383e20311453d2f7aaef46e1b6c37e7b486759b'
            }
        });
        return NextResponse.json(user.data);
    } 
    catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}