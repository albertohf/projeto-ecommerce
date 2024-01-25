import prisma from "@/lib/prisma";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ''

type EventType  = 'user.created' | 'user.upload' | 'user.delete' |'*'


type Event = {
    data: EventDataType
    object: 'event'
    type: EventType
}

type EventDataType = {
    id: string
    first_name: string
    last_name: string
    email_addresses: EmailAddressType[]
    primary_email_address_id: string
    attributes: Record<string, string | number>
}

interface EmailAddressType {
    id: string
    email_address: string
}

async function handler(request: Request) {
    const payload = await request.json();
    const headersList = headers();
    const heads = {
        'svix-id': headersList.get('svix-id') || '',
        'svix-signature': headersList.get('svix-signature') || '',
        'svix-timestamp': headersList.get('svix-timestamp') || ''
    };
    const webhook = new Webhook(webhookSecret);
    let evt: Event | null = null;

    try {
        evt = webhook.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event;
    } catch (err) {
        console.error((err as Error).message)
        return NextResponse.json({ message: (err as Error).message }, { status: 400 })
    }

    if (evt.type === 'user.created' || evt.type === 'user.upload') {
        const {
            id,
            first_name,
            last_name,
            email_addresses,
            primary_email_address_id,
            ...attributes
        } = evt.data;

        await prisma.user.upsert({
            where: { externalId: id as string },
            create: {
                externalId: id as string,
                cpf: '00000000000',
                attributes
            },
            update: {
                attributes
            },
        })
    } else if (evt.type === 'user.delete') {
        await prisma.user.delete({
            where: { externalId: evt.data.id as string }
    })
    }

    return NextResponse.json({ message: 'ok' }, { status: 200 })
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;