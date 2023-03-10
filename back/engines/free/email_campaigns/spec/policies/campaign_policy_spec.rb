# frozen_string_literal: true

require 'rails_helper'

describe EmailCampaigns::CampaignPolicy do
  subject { described_class.new(user, campaign) }

  let(:scope) { EmailCampaigns::CampaignPolicy::Scope.new(user, campaign.class) }

  context 'on an automated campaign' do
    let!(:campaign) { create(:comment_on_your_comment_campaign) }

    context 'for a visitor' do
      let(:user) { nil }

      it { is_expected.not_to permit(:show)    }
      it { is_expected.not_to permit(:update)  }

      it 'does not index the campaign' do
        expect(scope.resolve.size).to eq 0
      end
    end

    context 'for a resident' do
      let(:user) { create(:user) }

      it { is_expected.not_to permit(:show)    }
      it { is_expected.not_to permit(:update)  }

      it 'does not index the campaign' do
        expect(scope.resolve.size).to eq 0
      end
    end

    context 'for an admin' do
      let(:user) { create(:admin) }

      it { is_expected.to permit(:show) }
      it { is_expected.to permit(:update) }

      it 'indexes the campaign' do
        expect(scope.resolve.size).to eq 1
      end
    end

    context 'for a project moderator' do
      let(:user) { create(:project_moderator, projects: [project]) }

      context 'of a public project' do
        let(:project) { create(:project) }

        it { is_expected.not_to permit(:show) }
        it { is_expected.not_to permit(:update) }

        it 'does not index the campaign' do
          expect(scope.resolve.size).to eq 0
        end
      end
    end
  end
end
