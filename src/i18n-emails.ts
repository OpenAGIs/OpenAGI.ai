export type EmailLocale = 'en' | 'zh-CN';

type WelcomeCopy = {
  subject: string;
  preview: string;
  title: string;
  greeting: (name?: string) => string;
  body: string;
  cta: string;
  ignore: string;
};

type OtpCopy = {
  subject: string;
  preview: (code: string) => string;
  title: string;
  intro: string;
  expires: (minutes: number) => string;
  ignore: string;
};

type TaskCopy = {
  subject: (taskName: string) => string;
  preview: (taskName: string) => string;
  title: string;
  completed: (taskName: string) => string;
  cta: string;
  hint: string;
};

type ReceiptCopy = {
  subject: string;
  preview: string;
  title: string;
  body: string;
  label: string;
};

type AlertCopy = {
  subjectPrefix: string;
  title: string;
  body: string;
  subjectLabel: string;
  messageLabel: string;
};

type CommonCopy = {
  unsubscribe: string;
  rights: string;
};

export type EmailCopy = {
  common: CommonCopy;
  welcome: WelcomeCopy;
  otp: OtpCopy;
  task: TaskCopy;
  receipt: ReceiptCopy;
  alert: AlertCopy;
};

const EMAIL_COPY: Record<EmailLocale, EmailCopy> = {
  en: {
    common: {
      unsubscribe: 'Unsubscribe',
      rights: 'All rights reserved.'
    },
    welcome: {
      subject: 'Welcome to OpenAGI',
      preview: 'Welcome to OpenAGI',
      title: 'Welcome to OpenAGI',
      greeting: (name?: string) => (name ? `Hi ${name},` : 'Hi there,'),
      body: 'Thanks for joining OpenAGI. You are now part of a community building open-source AI agents.',
      cta: 'Explore OpenAGI',
      ignore: 'If you did not sign up for OpenAGI, you can ignore this email.'
    },
    otp: {
      subject: 'Your OpenAGI verification code',
      preview: (code) => `Your verification code: ${code}`,
      title: 'Verification code',
      intro: 'Use the code below to sign in:',
      expires: (minutes) => `This code expires in ${minutes} minutes.`,
      ignore: 'If you did not request this code, you can ignore this email.'
    },
    task: {
      subject: (taskName) => `${taskName} completed`,
      preview: (taskName) => `${taskName} completed`,
      title: 'Task completed',
      completed: (taskName) => `${taskName} has completed.`,
      cta: 'View details',
      hint: 'You are receiving this because you enabled task notifications.'
    },
    receipt: {
      subject: 'Your OpenAGI receipt',
      preview: 'Your OpenAGI receipt',
      title: 'Payment receipt',
      body: 'Thanks for your purchase.',
      label: 'Receipt'
    },
    alert: {
      subjectPrefix: '[OpenAGI]',
      title: 'Admin alert',
      body: 'A high-priority system event was reported.',
      subjectLabel: 'Subject',
      messageLabel: 'Message'
    }
  },
  'zh-CN': {
    common: {
      unsubscribe: '退订',
      rights: '版权所有。'
    },
    welcome: {
      subject: '欢迎加入 OpenAGI',
      preview: '欢迎加入 OpenAGI',
      title: '欢迎加入 OpenAGI',
      greeting: (name?: string) => (name ? `${name}，你好：` : '你好：'),
      body: '感谢你加入 OpenAGI。你已成为开源 AI Agent 社区的一员。',
      cta: '访问 OpenAGI',
      ignore: '如果这不是你的注册操作，请忽略此邮件。'
    },
    otp: {
      subject: '你的 OpenAGI 验证码',
      preview: (code) => `你的验证码：${code}`,
      title: '登录验证码',
      intro: '请使用以下验证码完成登录：',
      expires: (minutes) => `验证码将在 ${minutes} 分钟后过期。`,
      ignore: '如果你未发起此请求，请忽略此邮件。'
    },
    task: {
      subject: (taskName) => `${taskName} 已完成`,
      preview: (taskName) => `${taskName} 已完成`,
      title: '任务完成通知',
      completed: (taskName) => `${taskName} 已执行完成。`,
      cta: '查看详情',
      hint: '你收到此邮件是因为已启用任务通知。'
    },
    receipt: {
      subject: '你的 OpenAGI 收据',
      preview: '你的 OpenAGI 收据',
      title: '支付收据',
      body: '感谢你的购买。',
      label: '收据链接'
    },
    alert: {
      subjectPrefix: '[OpenAGI]',
      title: '管理员告警',
      body: '系统检测到高优先级异常事件。',
      subjectLabel: '主题',
      messageLabel: '内容'
    }
  }
};

export function resolveEmailLocale(locale?: string): EmailLocale {
  if (!locale) return 'en';
  const normalized = locale.toLowerCase();
  if (normalized.startsWith('zh')) return 'zh-CN';
  return 'en';
}

export function getEmailCopy(locale?: string): EmailCopy {
  return EMAIL_COPY[resolveEmailLocale(locale)];
}
