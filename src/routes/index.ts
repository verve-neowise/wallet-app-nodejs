import { Router } from "express";
import { authorization, errorLogger, failSafehandler, requestLogger } from "../middlewares";

import authRoutes from './auth.routes'
import categoryRoutes from './category.routes'
import currencyRoutes from './currency.routes'
import walletRoutes from './wallet.routes'
import transactionRoutes from "./transaction.routes";

const router = Router()

router.use(requestLogger)

router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)
router.use('/currencies', currencyRoutes)

router.use('/wallets', authorization, walletRoutes)
router.use('/transactions', authorization, transactionRoutes)

router.use(errorLogger)
router.use(failSafehandler)

export default router