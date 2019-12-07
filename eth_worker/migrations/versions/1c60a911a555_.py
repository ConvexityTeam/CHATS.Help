"""empty message

Revision ID: 1c60a911a555
Revises: 007a183ddcf9
Create Date: 2019-10-21 20:06:07.110534

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c60a911a555'
down_revision = '007a183ddcf9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('blockchain_task', sa.Column('abi_type', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('blockchain_task', 'abi_type')
    # ### end Alembic commands ###