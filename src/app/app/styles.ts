import styled from "styled-components";
import { AnimatedPage, colors } from "@leparse/ui";

export const Container = styled.div`
  padding: 2rem;

  .tabs {
    margin-top: 2rem;
    background: #fff;

    border-radius: 2rem;

    width: 100%;
    height: calc(100vh - 10rem);
    padding: 2rem;
  }
`;

export const Enterprises = styled(AnimatedPage)`
  .title {
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.black};
  }
`;

export const EditEnterpriseModal = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 1.5rem;
      font-weight: 500;
    }

    .close_button {
      cursor: pointer;
      transition: 100ms ease;

      &:hover {
        transform: scale(1.1);
        fill: ${colors.red};
      }
    }
  }

  .leftRight {
    display: grid;
    grid-template-columns: 0.4fr 0.1fr 1fr;

    .left {
      .leftData {
        margin: 1rem 0;
      }
    }

    .right {
      .unities {
        display: grid;

        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;

        .unity {
          width: 100%;
          height: 8rem;
          padding: 2rem;

          border-radius: 1rem;
        }
      }
    }
  }

  .footer {
    margin: 1rem 0;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;

    position: relative;
  }
`;

export const RemoveEnterpriseModal = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-items: center;
  justify-content: center;

  position: relative;

  .confirmation {
    font-size: 1.25rem;
    font-weight: 900;
    opacity: 0.85;
    align-self: flex-start;
  }

  .confirmation_sub {
    font-size: 0.85rem;
    opacity: 0.75;
    align-self: flex-start;
  }

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    margin-bottom: 1rem;

    .close_button {
      cursor: pointer;
      transition: 100ms ease;

      &:hover {
        transform: scale(1.1);
        fill: ${colors.red};
      }
    }
  }
`;
