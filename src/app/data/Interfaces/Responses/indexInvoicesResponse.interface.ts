interface InvoiceAttributes {
	user_id: string;
	created_by: string;
	invoice_number: string;
	invoice_date: string;
	due_date: string;
	total_amount: string;
	status: string;
}

export interface InvoiceData {
	type: string;
	id: string;
	attributes: InvoiceAttributes;
}

interface InvoiceLink {
	url: string | null;
	label: string;
	active: boolean;
}

interface InvoiceMeta {
	current_page: number;
	from: number;
	last_page: number;
	links: InvoiceLink[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

interface InvoiceLinks {
	first: string;
	last: string;
	prev: string | null;
	next: string | null;
}

export interface IndexInvoicesResponseInterface {
	data: InvoiceData[];
	links: InvoiceLinks;
	meta: InvoiceMeta;
}
