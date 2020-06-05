"""Adds synchronization_filter and synchronization_block for tx sync

Revision ID: d41e2c376b02
Revises: 07dd5846b6db
Create Date: 2020-06-03 14:36:55.815107

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd41e2c376b02'
down_revision = '07dd5846b6db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('synchronization_filter',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('authorising_user_id', sa.Integer(), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('updated', sa.DateTime(), nullable=True),
    sa.Column('contract_address', sa.String(), nullable=True),
    sa.Column('contract_type', sa.String(), nullable=True),
    sa.Column('last_block_synchronized', sa.Integer(), nullable=True),
    sa.Column('filter_parameters', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('synchronized_block',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('authorising_user_id', sa.Integer(), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('updated', sa.DateTime(), nullable=True),
    sa.Column('block_number', sa.Integer(), nullable=True),
    sa.Column('synchronization_filter_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['synchronization_filter_id'], ['synchronization_filter.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('synchronized_block')
    op.drop_table('synchronization_filter')
    # ### end Alembic commands ###