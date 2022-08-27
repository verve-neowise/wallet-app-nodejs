import moment from "moment";

export function info(message: string) {
    console.log(`[INFO] ${message}` );
}

export function error(message: string) {
    console.log(`[ERROR] ${message}`);
}

export function dateFromQuery(param?: string): Date | null {
    return param ? moment(param, "YYYY-MM-DD").toDate() : null
}