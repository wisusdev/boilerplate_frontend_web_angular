export interface InvoiceItem {
	type: string;
	id: string;
	attributes: {
		invoice_id: string;
		description: string;
		quantity: number;
		unit_price: string;
		total_price: string;
		metadata: any;
	};
}

export interface InvoiceUser {
	first_name: string;
	last_name: string;
	email: string;
}

export interface Relationships {
	user: InvoiceUser;
	items: InvoiceItem[];
}

export interface InvoiceAttributes {
	user_id: string;
	created_by: string;
	invoice_number: string;
	invoice_date: string;
	due_date: string;
	total_amount: string;
	status: string;
}

export interface ShowInvoiceResponseInterface {
	data: {
		type: string;
		id: string;
		attributes: InvoiceAttributes;
		relationships: Relationships;
	};
}
