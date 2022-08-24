import { Category, Currency, Transaction, Wallet, WalletStatus } from "@prisma/client"

export type WalletDetail =  {
    id: number
    name: string
    status: WalletStatus
    category: Category
    currency: Currency
    transactions: Transaction[]
    balance: number
    createdAt: Date
    updatedAt: Date
}