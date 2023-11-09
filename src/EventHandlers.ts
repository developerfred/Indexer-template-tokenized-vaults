/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  SavingsDaiContract_Approval_loader,
  SavingsDaiContract_Approval_handler,
  SavingsDaiContract_Deposit_loader,
  SavingsDaiContract_Deposit_handler,
  SavingsDaiContract_Transfer_loader,
  SavingsDaiContract_Transfer_handler,
  SavingsDaiContract_Withdraw_loader,
  SavingsDaiContract_Withdraw_handler,
} from "../generated/src/Handlers.gen";

import {
  ApprovalEntity,
  DepositEntity,
  TransferEntity,
  WithdrawEntity,
  EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  approvalsCount: BigInt(0),
  depositsCount: BigInt(0),
  transfersCount: BigInt(0),
  withdrawsCount: BigInt(0),
};

SavingsDaiContract_Approval_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SavingsDaiContract_Approval_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    approvalsCount: currentSummaryEntity.approvalsCount + BigInt(1),
  };

  let approvalEntity: ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    spender: event.params.spender,
    value: event.params.value,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Approval.set(approvalEntity);
});

SavingsDaiContract_Deposit_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SavingsDaiContract_Deposit_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    depositsCount: currentSummaryEntity.depositsCount + BigInt(1),
  };

  let depositEntity: DepositEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    owner: event.params.owner,
    assets: event.params.assets,
    shares: event.params.shares,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Deposit.set(depositEntity);
});

SavingsDaiContract_Transfer_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SavingsDaiContract_Transfer_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    transfersCount: currentSummaryEntity.transfersCount + BigInt(1),
  };

  let transferEntity: TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Transfer.set(transferEntity);
});

SavingsDaiContract_Withdraw_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SavingsDaiContract_Withdraw_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    withdrawsCount: currentSummaryEntity.withdrawsCount + BigInt(1),
  };

  let withdrawEntity: WithdrawEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    receiver: event.params.receiver,
    owner: event.params.owner,
    assets: event.params.assets,
    shares: event.params.shares,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Withdraw.set(withdrawEntity);
});

