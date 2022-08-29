import { Router } from "express";
import { Role } from "@prisma/client";

import { authorization, errorLogger, failSafehandler, requestLogger } from "../middlewares";

import authRoutes from './auth.routes'
import categoryRoutes from './category.routes'
import currencyRoutes from './currency.routes'
import walletRoutes from './wallet.routes'
import typeRoutes from './wallet-type.routes'
import transactionRoutes from "./transaction.routes";

const router = Router()

router.use(requestLogger)

router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)
router.use('/currencies', currencyRoutes)
router.use('/types', typeRoutes)

router.use('/wallets', authorization(Role.USER), walletRoutes)
router.use('/transactions', authorization(Role.USER), transactionRoutes)

router.use(errorLogger)
router.use(failSafehandler)

export default router