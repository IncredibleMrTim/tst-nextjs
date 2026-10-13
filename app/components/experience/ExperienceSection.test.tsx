import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  focusExperience,
  setSkill
} from '@/store/experienceFilter/filterSlice';
import { renderWithStore } from '@/utils/renderWithStore';
import { buildExperience } from '@/utils/testFixtures';
import ExperienceSection from './ExperienceSection';

// Newest first, as the experience action returns them
const experiences = [
  buildExperience({
    id: 'recent',
    company: 'Recent Co',
    role: 'Lead Engineer',
    fromDate: new Date('2025-01-01'),
    toDate: null,
    summary: '- Shipped the platform',
    technologies: ['React', 'Storybook']
  }),
  buildExperience({
    id: 'middle',
    company: 'Middle Co',
    role: 'Senior Engineer',
    fromDate: new Date('2015-03-01'),
    toDate: new Date('2018-03-01'),
    summary: '- Built the APIs',
    technologies: ['C#']
  }),
  buildExperience({
    id: 'early',
    company: 'Early Co',
    role: 'Developer',
    fromDate: new Date('2005-06-01'),
    toDate: new Date('2008-06-01'),
    summary: '- Wrote websites',
    technologies: ['PHP']
  })
];

// The career timeline also has a button per company, so role rows are the ones that expand
const findRoleTrigger = (company: string) =>
  screen
    .queryAllByRole('button', { name: new RegExp(company) })
    .find(button => button.hasAttribute('aria-expanded'));

const getRoleTrigger = (company: string) => {
  const trigger = findRoleTrigger(company);
  if (!trigger) throw new Error(`No role row found for ${company}`);
  return trigger;
};

const expectRoleOpen = (company: string, isOpen: boolean) =>
  expect(getRoleTrigger(company)).toHaveAttribute(
    'aria-expanded',
    String(isOpen)
  );

describe('ExperienceSection', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should list every role, most recent first', () => {
    renderWithStore(<ExperienceSection experiences={experiences} />);

    const rows = ['Recent Co', 'Middle Co', 'Early Co'].map(getRoleTrigger);

    expect(rows[0].compareDocumentPosition(rows[1])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(rows[1].compareDocumentPosition(rows[2])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('should open the two most recent roles by default', () => {
    renderWithStore(<ExperienceSection experiences={experiences} />);

    expectRoleOpen('Recent Co', true);
    expectRoleOpen('Middle Co', true);
    expectRoleOpen('Early Co', false);
  });

  it('should mark the role with no end date as current', () => {
    renderWithStore(<ExperienceSection experiences={experiences} />);

    expect(
      within(getRoleTrigger('Recent Co')).getByText('Current')
    ).toBeVisible();
    expect(
      within(getRoleTrigger('Middle Co')).queryByText('Current')
    ).not.toBeInTheDocument();
  });

  it('should open and close every role with the expand all button', async () => {
    renderWithStore(<ExperienceSection experiences={experiences} />);

    await userEvent.click(screen.getByRole('button', { name: 'Expand all' }));
    expectRoleOpen('Early Co', true);

    await userEvent.click(screen.getByRole('button', { name: 'Collapse all' }));
    expectRoleOpen('Recent Co', false);
  });

  it('should only show roles from the chosen decade', async () => {
    renderWithStore(<ExperienceSection experiences={experiences} />);

    await userEvent.click(screen.getByRole('button', { name: /^2000s/ }));

    expect(findRoleTrigger('Early Co')).toBeInTheDocument();
    expect(findRoleTrigger('Recent Co')).toBeUndefined();
  });

  it('should count the roles in each decade', () => {
    renderWithStore(<ExperienceSection experiences={experiences} />);

    ['2020s (1)', '2010s (1)', '2000s (1)'].forEach(label =>
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    );
  });

  describe('filtering by skill', () => {
    it('should say how many roles used the skill and open only those', () => {
      const { store } = renderWithStore(
        <ExperienceSection experiences={experiences} />
      );

      act(() => {
        store.dispatch(setSkill('Storybook'));
      });

      expect(
        screen.getByText(/Roles that used Storybook: 1 of 3/)
      ).toBeInTheDocument();
      expectRoleOpen('Recent Co', true);
      expectRoleOpen('Middle Co', false);
    });

    it('should highlight the skill in the matching role', () => {
      const { store } = renderWithStore(
        <ExperienceSection experiences={experiences} />
      );

      act(() => {
        store.dispatch(setSkill('Storybook'));
      });

      expect(screen.getByText('Storybook')).toHaveClass('bg-brand-gradient');
    });

    it('should clear the filter', async () => {
      const { store } = renderWithStore(
        <ExperienceSection experiences={experiences} />
      );
      act(() => {
        store.dispatch(setSkill('Storybook'));
      });

      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(store.getState().experienceFilter.skill).toBeNull();
      expect(screen.queryByText(/Roles that used/)).not.toBeInTheDocument();
    });
  });

  describe('jumping to a role', () => {
    it('should open the role, scroll to it and clear the request', async () => {
      const { store } = renderWithStore(
        <ExperienceSection experiences={experiences} />
      );

      act(() => {
        store.dispatch(focusExperience('early'));
      });

      await waitFor(() => expectRoleOpen('Early Co', true));
      await waitFor(() =>
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
      );
      expect(store.getState().experienceFilter.focusedExperienceId).toBeNull();
    });

    it('should jump to a role when its bar on the timeline is chosen', async () => {
      const { store } = renderWithStore(
        <ExperienceSection experiences={experiences} />
      );

      await userEvent.click(
        screen.getByRole('button', { name: /^Early Co, .*Show role/ })
      );

      await waitFor(() => expectRoleOpen('Early Co', true));
      expect(store.getState().experienceFilter.focusedExperienceId).toBeNull();
    });
  });
});
