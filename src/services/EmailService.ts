interface DonationReceipt {
  donorName: string;
  donorEmail: string;
  amount: number;
  isMonthly: boolean;
  campaignTitle: string;
  campaignId: string;
  transactionId: string;
  date: string;
}

interface CampaignUpdate {
  campaignTitle: string;
  campaignId: string;
  updateTitle: string;
  updateContent: string;
  recipients: string[];
}

interface DonationReminder {
  donorName: string;
  donorEmail: string;
  campaignTitle: string;
  amount: number;
  nextDonationDate: string;
}

class EmailService {
  private static baseUrl = '/api/email'; // Backend API endpoint

  // Send donation receipt
  static async sendDonationReceipt(receipt: DonationReceipt): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/receipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receipt),
      });

      if (!response.ok) {
        throw new Error('Failed to send receipt');
      }

      return true;
    } catch (error) {
      console.error('Error sending donation receipt:', error);
      return false;
    }
  }

  // Send campaign update to supporters
  static async sendCampaignUpdate(update: CampaignUpdate): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/campaign-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      });

      if (!response.ok) {
        throw new Error('Failed to send campaign update');
      }

      return true;
    } catch (error) {
      console.error('Error sending campaign update:', error);
      return false;
    }
  }

  // Send monthly donation reminder
  static async sendDonationReminder(reminder: DonationReminder): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/donation-reminder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminder),
      });

      if (!response.ok) {
        throw new Error('Failed to send donation reminder');
      }

      return true;
    } catch (error) {
      console.error('Error sending donation reminder:', error);
      return false;
    }
  }

  // Send welcome email to new users
  static async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/welcome`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error('Failed to send welcome email');
      }

      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  // Send password reset email
  static async sendPasswordReset(email: string, resetToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }

      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }

  // Generate email template for donation receipt
  static generateDonationReceiptTemplate(receipt: DonationReceipt): string {
    const {
      donorName,
      amount,
      isMonthly,
      campaignTitle,
      transactionId,
      date
    } = receipt;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Donation Receipt - GlobalHelper</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .receipt-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .amount { font-size: 24px; font-weight: bold; color: #4F46E5; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Donation!</h1>
            <p>Your generosity makes a real difference</p>
          </div>
          
          <div class="content">
            <p>Dear ${donorName},</p>
            
            <p>Thank you for your generous ${isMonthly ? 'monthly' : 'one-time'} donation of <span class="amount">$${amount}</span> to support <strong>${campaignTitle}</strong>.</p>
            
            <div class="receipt-details">
              <h3>Donation Details</h3>
              <p><strong>Transaction ID:</strong> ${transactionId}</p>
              <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> $${amount}</p>
              <p><strong>Type:</strong> ${isMonthly ? 'Monthly Recurring' : 'One-time'}</p>
              <p><strong>Campaign:</strong> ${campaignTitle}</p>
            </div>
            
            <p>Your donation is tax-deductible to the extent allowed by law. You can use this receipt for your tax records.</p>
            
            <a href="${window.location.origin}/profile" class="button">View Your Donation History</a>
            
            <p>We'll keep you updated on the impact of your contribution through campaign updates.</p>
            
            <p>With gratitude,<br>The GlobalHelper Team</p>
          </div>
          
          <div class="footer">
            <p>GlobalHelper Foundation | 123 Charity Lane, Hope City, HC 12345</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate email template for campaign update
  static generateCampaignUpdateTemplate(update: CampaignUpdate): string {
    const { updateTitle, updateContent, campaignTitle } = update;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Campaign Update - ${campaignTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .update-content { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Campaign Update</h1>
            <p>${campaignTitle}</p>
          </div>
          
          <div class="content">
            <h2>${updateTitle}</h2>
            
            <div class="update-content">
              <p>${updateContent}</p>
            </div>
            
            <a href="${window.location.origin}/campaigns" class="button">View All Campaigns</a>
            
            <p>Thank you for your continued support!</p>
            
            <p>Best regards,<br>The GlobalHelper Team</p>
          </div>
          
          <div class="footer">
            <p>GlobalHelper Foundation | 123 Charity Lane, Hope City, HC 12345</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default EmailService;
